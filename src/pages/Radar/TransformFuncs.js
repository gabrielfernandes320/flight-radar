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

export default () => (
  <React.Fragment>
    <div className={"dx-card responsive-paddings"}>
      <h2 className={"content-block"}>Funcoes de Transformacao</h2>
      <div id="second-line">
        <Form colCount={2}>
          <Item>
            <div id="translandar">
              <h2 className={"content-block"}>Transladar</h2>
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
                <Item>
                  <Button
                    className="form-btn"
                    style={{ "margin-top": "10px" }}
                    text="Translandar"
                    type="default"
                    stylingMode="contained"
                  />
                </Item>
              </Form>
            </div>
          </Item>
          <Item>
            <div id="escalonar">
              <h2 className={"content-block"}>Escalonar</h2>
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
                <Item>
                  <Button
                    className="form-btn"
                    style={{ "margin-top": "10px" }}
                    text="Escalonar"
                    type="default"
                    stylingMode="contained"
                  />
                </Item>
              </Form>
            </div>
          </Item>
          <Item>
            <div id="Angulo">
              <Form colCount={1}>
                <Item
                  dataField={"Angulo"}
                  editorType={"dxTextBox"}
                  editorOptions={{
                    stylingMode: "filled",
                    placeholder: "Angulo",
                  }}
                >
                  <Label visible={false} text="Angulo" />
                </Item>

                <Item>
                  <Button
                    className="form-btn"
                    style={{ "margin-top": "10px" }}
                    text="Rotacionar"
                    type="default"
                    stylingMode="contained"
                  />
                </Item>
              </Form>
            </div>
          </Item>
          <Item>
            <div id="x">
              <Form colCount={2}>
                <Item
                  dataField={"X"}
                  editorType={"dxTextBox"}
                  editorOptions={{
                    stylingMode: "filled",
                    placeholder: "X",
                  }}
                >
                  <Label visible={false} text="X" />
                </Item>
                <Item
                  dataField={"X"}
                  editorType={"dxTextBox"}
                  editorOptions={{
                    stylingMode: "filled",
                    placeholder: "Y",
                  }}
                >
                  <Label visible={false} text="X" />
                </Item>
              </Form>
            </div>
          </Item>
        </Form>
      </div>
    </div>
  </React.Fragment>
);
