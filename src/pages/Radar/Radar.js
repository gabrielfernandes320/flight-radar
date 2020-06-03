import React from "react";
import "./Radar.scss";
import Form, { Item, Label } from "devextreme-react/form";
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
    <h2 className={"content-block"}>Radar</h2>
    <div className={"content-block"}>
      <div className={"dx-card responsive-paddings"}>
        <Form colCount={3}>
          <Item>
            <div id="first-line">
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
              </Form>
            </div>
            <div id="third-line">
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
        </Form>
      </div>
    </div>
  </React.Fragment>
);
