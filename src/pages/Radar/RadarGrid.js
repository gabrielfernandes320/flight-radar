import React, { useRef, useState } from "react";
import "./Radar.scss";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
} from "devextreme-react/form";
import airplane from "./Emojione_2708.svg";
import { Popup } from "devextreme-react/popup";
import { TextBox, TextArea } from "devextreme-react";
import {
  Chart,
  CommonSeriesSettings,
  Series,
  Point,
  ArgumentAxis,
  ValueAxis,
  Legend,
  Export,
  Grid,
  Border,
  Tooltip,
  CommonPaneSettings,
} from "devextreme-react/chart";
import { Button } from "devextreme-react";
import {
  DataGrid,
  Column,
  Editing,
  Scrolling,
  Lookup,
  Summary,
  TotalItem,
  Pager,
  Paging,
  Selection,
  FilterRow,
  ColumnChooser,
  Grouping,
  GroupPanel,
  ColumnFixing,
} from "devextreme-react/data-grid";
import { useAuth } from "../../contexts/auth";
//import pc2 from "polar-to-cartesian/src/index";

export default function () {
  const [visible, setVisible] = useState();

  function changePopupVisibility() {
    visible === true ? setVisible(false) : setVisible(true);
  }

  const { user, data, setData, setDataGrid } = useAuth();

  function cartesian2Polar(x, y) {
    let distance = Math.sqrt(x * x + y * y);
    let radians = Math.atan2(y, x); //This takes y first
    let degrees = radians * (180 / Math.PI);
    let polarCoor = { distance: distance, degrees: degrees, radians: radians };
    return polarCoor;
  }

  function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
  }

  const p2c = (r, theta) => {
    return {
      x: r * Math.cos(theta),
      y: r * Math.sin(theta),
    };
  };

  const insertRayAndDegrees = (rowData) => {
    const cords = cartesian2Polar(rowData.x, rowData.y);

    data.find(
      (x) => x.__KEY__ === rowData.__KEY__
    ).ray = cords.distance.toFixed(2);

    data.find(
      (x) => x.__KEY__ === rowData.__KEY__
    ).degrees = cords.degrees.toFixed(2);
  };

  const insertXandY = (rowData) => {
    const xy = p2c(rowData.ray, degrees_to_radians(rowData.degrees));

    data.find((x) => x.__KEY__ === rowData.__KEY__).x = xy.x.toFixed(2);
    data.find((x) => x.__KEY__ === rowData.__KEY__).y = xy.y.toFixed(2);
  };

  const onInitialized = (e) => {
    setDataGrid(e.component);
  };

  let index = 0;
  return (
    <React.Fragment>
      <Button
        text="Grid"
        type="default"
        useSubmitBehavior={true}
        stylingMode="contained"
        onClick={changePopupVisibility}
      />
      <div className={"content-block"}>
        <Popup
          className="pop-up"
          visible={visible}
          onHiding={changePopupVisibility}
          dragEnabled={true}
          resizeEnabled={true}
          closeOnOutsideClick={true}
          showTitle={true}
          title="Grid"
          width={"fit-content"}
        >
          <DataGrid
            id="grid"
            height={"fit-content"}
            width={"600"}
            allowColumnReordering={true}
            allowColumnResizing={true}
            showBorders={true}
            selectedRowKeys
            dataSource={data}
            repaintChangesOnly={true}
            columnAutoWidth={true}
            onInitialized={onInitialized}
            rowAlternationEnabled={true}
            onRowRemoved={(e) => {
              setData(data.filter((x) => x.key !== e.key));
            }}
            onRowUpdated={(e) => {
              setData((data) => [...data]);
            }}
            onRowUpdating={(e) => {
              if (!isNaN(e.newData.x)) {
                e.oldData.x = e.newData.x;
                insertRayAndDegrees(e.oldData);
              }
              if (!isNaN(e.newData.y)) {
                e.oldData.y = e.newData.y;
                insertRayAndDegrees(e.oldData);
              }
              if (!isNaN(e.newData.ray)) {
                e.oldData.ray = e.newData.ray;
                insertXandY(e.oldData);
              }
              if (!isNaN(e.newData.degrees)) {
                e.oldData.degrees = e.newData.degrees;
                insertXandY(e.oldData);
              }
            }}
            onRowInserted={(e) => {
              if (isNaN(e.data.x) && isNaN(e.data.y)) insertXandY(e.data);

              if (isNaN(e.data.ray) && isNaN(e.data.degrees))
                insertRayAndDegrees(e.data);

              setData((data) => [...data]);
            }}
          >
            <Selection deferred={true} mode="multiple" />
            <Paging defaultPageSize={20} />
            <Pager showPageSizeSelector={true} showInfo={true} />
            <FilterRow visible={true} />
            <Editing
              confirmDelete={false}
              refreshMode={"full"}
              mode="cell"
              allowAdding={true}
              allowDeleting={true}
              allowUpdating={true}
            />
            <Export
              enabled={true}
              fileName="Grid"
              allowExportSelectedData={true}
            />
            <Scrolling mode="virtual" />

            <Column
              dataField="x"
              dataType="number"
              width="auto"
              caption="X"
            ></Column>

            <Column
              dataField="y"
              width="auto"
              dataType="number"
              caption="Y"
            ></Column>

            <Column
              dataField="ray"
              width="auto"
              dataType="number"
              caption="Raio"
            ></Column>
            <Column
              dataField="degrees"
              width="100px"
              dataType="number"
              caption="Angulo"
            ></Column>
            <Column
              dataField="speed"
              width="100px"
              dataType="number"
              caption="Velocidade(km/m)"
            ></Column>
            <Column
              dataField="direction"
              width="100px"
              dataType="number"
              caption="DIrecao"
            ></Column>
          </DataGrid>
        </Popup>
      </div>
    </React.Fragment>
  );
}
