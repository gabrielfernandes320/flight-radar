import React from "react";
import "./Radar.scss";
import Form, { Item, Label } from "devextreme-react/form";
import Popup from "devextreme/ui/popup";
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
    <Popup
      className="pop-up"
      visible={true}
      //onHiding={changePopupVisibility}
      dragEnabled={true}
      resizeEnabled={true}
      closeOnOutsideClick={true}
      showTitle={true}
      title="Filtros"
      width={"fit-content"}
      height={"fit-content"}
    >
      <h2 className={"content-block"}>Entrada de dados</h2>
      <Form colCount={2}>
        <Item
          dataField={"x"}
          editorType={"dxTextBox"}
          editorOptions={XEditorOptions}
        >
          <Label visible={false} text="X" />
        </Item>
        <Item
          dataField={"y"}
          editorType={"dxTextBox"}
          editorOptions={YEditorOptions}
        >
          <Label visible={false} text="X" />
        </Item>
        <Item
          dataField={"angulo"}
          editorType={"dxTextBox"}
          editorOptions={AnguloEditorOptions}
        >
          <Label visible={false} text="X" />
        </Item>
        <Item
          dataField={"raio"}
          editorType={"dxTextBox"}
          editorOptions={RaioEditorOptions}
        >
          <Label visible={false} text="X" />
        </Item>
        <Item
          dataField={"direcao"}
          editorType={"dxTextBox"}
          editorOptions={DirecaoEditorOptions}
        >
          <Label visible={false} text="X" />
        </Item>
        <Item
          dataField={"velocidade"}
          editorType={"dxTextBox"}
          editorOptions={VelocidadeEditorOptions}
        >
          <Label visible={false} text="X" />
        </Item>
        <Item>
          <Button
            className="form-btn"
            style={{ "margin-top": "10px" }}
            text="Inserir"
            type="default"
            stylingMode="contained"
          />
        </Item>
      </Form>
    </Popup>
  </React.Fragment>
);
