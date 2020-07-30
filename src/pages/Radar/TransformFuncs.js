import React, { useState, useRef } from "react";
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

export default () => {
  const { user, data, setData, dataGrid } = useAuth();

  const transladarFormData = useRef({});
  const escalonarFormData = useRef({});

  const [visible, setVisible] = useState();
  function changePopupVisibility() {
    visible === true ? setVisible(false) : setVisible(true);
  }

  return (
    <React.Fragment>
      <Button
        className="btn"
        text="Funcoes de Transformacao"
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
        title="Funcoes de Transformacao"
        width={"fit-content"}
      >
        <div id="second-line">
          <Form colCount={2}>
            <Item>
              <div id="translandar">
                <h6 className={"content-block"}>Transladar</h6>
                <Form formData={transladarFormData.current} colCount={2}>
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
                      onClick={() => {
                        dataGrid.getSelectedRowsData().then((rowData) => {
                          for (let element of rowData) {
                            element.x += parseInt(transladarFormData.current.x);
                            element.y += parseInt(transladarFormData.current.y);
                          }
                          setData((data) => [...data]);
                          changePopupVisibility();

                          transladarFormData.current = {};
                        });
                      }}
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
                <h6 className={"content-block"}>Escalonar</h6>
                <Form formData={escalonarFormData.current} colCount={2}>
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
                      onClick={() => {
                        dataGrid.getSelectedRowsData().then((rowData) => {
                          for (let element of rowData) {
                            element.x *= parseInt(escalonarFormData.current.x);
                            element.y *= parseInt(escalonarFormData.current.y);
                          }
                          setData((data) => [...data]);
                          changePopupVisibility();
                          escalonarFormData.current = {};
                        });
                      }}
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
                      onClick={() => {
                        dataGrid.getSelectedRowsData().then((rowData) => {
                          console.log(rowData);
                        });
                      }}
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
      </Popup>
    </React.Fragment>
  );
};
