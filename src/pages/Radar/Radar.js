import React from "react";
import "./Radar.scss";
import Form, { Item, Label } from "devextreme-react/form";
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

const data = [
  {
    x1: 2,
    y1: 5,
  },
  {
    x1: 6,
    y1: 8,
    x2: 5,
    y2: 9,
  },
  {
    x1: -5,
    y1: 6,
  },
];

export default () => (
  <React.Fragment>
    <h2 className={"content-block"}>Radar</h2>
    <div className={"content-block"}>
      <div className={"adx-card responsive-paddings"}>
        <Form colCount={3}>
          <Item>
            <div className={"dx-card responsive-paddings"}>
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
            </div>
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
              </Form>
            </div>
          </Item>
          <Item>
            <Form>
              <Item>
                <div className="dx-card responsive-paddings">
                  <h2 className={"content-block"}>Radar</h2>
                  <Chart id="chart" dataSource={data}>
                    <CommonSeriesSettings type="scatter" />
                    <Series argumentField="x1" valueField="y1" />
                    <Series argumentField="x2" valueField="y2">
                      <Point symbol="triangleDown" />
                    </Series>
                    <ArgumentAxis
                      defaultVisualRange={[-20, 20]}
                      customPosition={0}
                      offset={0}
                    />
                    <ValueAxis
                      defaultVisualRange={[-20, 20]}
                      customPosition={0}
                      offset={0}
                      endOnTick={false}
                    />
                    <Legend visible={false} />
                  </Chart>
                </div>
              </Item>
            </Form>
            <div
              className="dx-card responsive-paddings"
              style={{ marginTop: "420px" }}
            >
              <Form colCount={2}>
                <Item>
                  <Form colCount={1}>
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
                  </Form>
                </Item>
                <Item>
                  <Form colCount={1}>
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
                </Item>
              </Form>
            </div>
          </Item>
        </Form>
      </div>
    </div>
  </React.Fragment>
);
