import React from "react";
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
import { Button } from "devextreme-react";

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

export default () => (
  <React.Fragment>
    <div className="dx-card responsive-paddings">
      <h2 className={"content-block"}>Funcoes de Rastreamento</h2>
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
            stylingMode="contained"
          />
        </Item>
      </Form>
    </div>
  </React.Fragment>
);
