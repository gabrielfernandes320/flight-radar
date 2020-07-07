import React, { useRef, useState } from "react";
import "./Radar.scss";
import Form, { Item, Label } from "devextreme-react/form";
import airplane from "../aeroplane.svg";
import {
  Chart,
  CommonSeriesSettings,
  Series,
  Point,
  ArgumentAxis,
  ValueAxis,
  Legend,
} from "devextreme-react/chart";
import { Button, Popup } from "devextreme-react";
import { useAuth } from "../../contexts/auth";

const XEditorOptions = {
  stylingMode: "filled",
  placeholder: "X",
};

const YEditorOptions = {
  stylingMode: "filled",
  placeholder: "Y",
};

const RaioEditorOptions = {
  stylingMode: "filled",
  placeholder: "Raio",
};
const AnguloEditorOptions = {
  stylingMode: "filled",
  placeholder: "Angulo",
};
const VelocidadeEditorOptions = {
  stylingMode: "filled",
  placeholder: "Velocidade",
};
const DirecaoEditorOptions = {
  stylingMode: "filled",
  placeholder: "Direcao",
};
const funcRastrEditorOptions = {
  stylingMode: "filled",
  placeholder: "Distancia Minima",
};

export default () => {
  const [visible, setVisible] = useState();
  function changePopupVisibility() {
    visible === true ? setVisible(false) : setVisible(true);
  }

  const { user, data, setData, dataGrid } = useAuth();

  return (
    <React.Fragment>
      <Button
        className="btn"
        text="Funcoes de Rastreabilidade"
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
        title="Funcoes de Rastreabilidade"
        width={"fit-content"}
      >
        <Form colCount={1}>
          <Item
            dataField={"funcoesRastreamento"}
            editorType={"dxTextBox"}
            editorOptions={funcRastrEditorOptions}
          >
            <Label visible={false} text="X" />
          </Item>
          <Item>
            <Button
              className="form-btn"
              style={{ "margin-top": "10px" }}
              text="Avioes proximos ao aeroporto"
              type="default"
              onClick={() => {
                dataGrid.getSelectedRowsData().then((rowData) => {
                  console.log(rowData);
                });
              }}
              stylingMode="contained"
            />
          </Item>
          <Item
            dataField={"distanciaMin"}
            editorType={"dxTextBox"}
            editorOptions={{
              stylingMode: "filled",
              placeholder: "Distacia min.",
            }}
          >
            <Label visible={false} text="distanciaMin" />
          </Item>
          <Item>
            <Button
              className="form-btn"
              style={{ "margin-top": "10px" }}
              text="Avioes Proximos"
              type="default"
              onClick={() => {
                dataGrid.getSelectedRowsData().then((rowData) => {
                  console.log(rowData);
                });
              }}
              stylingMode="contained"
            />
          </Item>
          <Item
            dataField={"TempoMin"}
            editorType={"dxTextBox"}
            editorOptions={{
              stylingMode: "filled",
              placeholder: "Tempo min.",
            }}
          >
            <Label visible={false} text="TempoMin" />
          </Item>

          <Item>
            <Button
              className="form-btn"
              style={{ "margin-top": "10px" }}
              text="Em rota de colisao"
              type="default"
              onClick={() => {
                dataGrid.getSelectedRowsData().then((rowData) => {
                  console.log(rowData);
                });
              }}
              stylingMode="contained"
            />
          </Item>
        </Form>
      </Popup>
    </React.Fragment>
  );
};
