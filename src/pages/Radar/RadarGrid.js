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
} from "devextreme-react/data-grid";
import { useAuth } from "../../contexts/auth";

export default function () {
  const formData = useRef({});

  const [visible, setVisible] = useState();

  function changePopupVisibility() {
    visible === true ? setVisible(false) : setVisible(true);
  }

  const { user, data, setData } = useAuth();

  function cartesian2Polar(x, y) {
    let distance = Math.sqrt(x * x + y * y);
    let radians = Math.atan2(y, x); //This takes y first
    let degrees = radians * (180 / Math.PI);
    let polarCoor = { distance: distance, degrees: degrees };
    return polarCoor;
  }

  return (
    <React.Fragment>
      <div className={"content-block"}>
        <Button
          className="btn"
          text="Grid"
          type="default"
          useSubmitBehavior={true}
          stylingMode="contained"
          onClick={changePopupVisibility}
        />
        <Popup
          className="pop-up"
          visible={visible}
          onHiding={changePopupVisibility}
          dragEnabled={true}
          resizeEnabled={true}
          closeOnOutsideClick={true}
          showTitle={true}
          title="Filtros"
          width={"fit-content"}
        >
          <DataGrid
            id="grid"
            height={"fit-content"}
            width={"600"}
            showBorders={true}
            dataSource={data}
            repaintChangesOnly={true}
            onRowRemoved={(e) => {
              setData(data.filter((x) => x.key !== e.key));
            }}
            onRowUpdated={(e) => {
              setData((data) => [...data]);
            }}
            onRowInserted={(e) => {
              data.find(
                (x) => x.__KEY__ === e.data.__KEY__
              ).ray = cartesian2Polar(e.data.x, e.data.y).distance;

              data.find(
                (x) => x.__KEY__ === e.data.__KEY__
              ).degrees = cartesian2Polar(e.data.x, e.data.y).degrees;

              setData((data) => [...data]);
            }}
          >
            <Editing
              refreshMode={"full"}
              mode="cell"
              allowAdding={true}
              allowDeleting={true}
              allowUpdating={true}
            />

            <Scrolling mode="virtual" />

            <Column dataField="x" width="auto" caption="X"></Column>

            <Column dataField="y" width="auto" caption="Y"></Column>

            <Column dataField="ray" width="auto" caption="Raio"></Column>
            <Column dataField="degrees" width="auto" caption="Angulo"></Column>
          </DataGrid>
        </Popup>
      </div>
    </React.Fragment>
  );
}
