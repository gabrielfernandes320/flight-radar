import React, { useRef, useState } from "react";
import "./Radar.scss";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
} from "devextreme-react/form";
import airplane from "./Emojione_2708.svg";
import Popup from "devextreme/ui/popup";
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
import DataEntry from "./DataEntry";

export default function () {
  const formData = useRef({});
  const data = [
    {
      x: 2,
      y: 5,
    },
    {
      x: 6,
      y: 8,
    },
    {
      x: -5,
      y: 6,
    },
  ];

  const [x, setX] = useState(null);
  const [y, setY] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    data.push({ x: x, y: y });
  };

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

  const valueChanged = (data) => {
    console.log(data);
  };

  return (
    <React.Fragment>
      <div className={"content-block"}>
        <div className={"dx-card responsive-paddings"}>
          <Form colCount={1}>
            <Item>
              <h2 className={"content-block"}>Entrada de dados</h2>
              <form className={"login-form"} onSubmit={onSubmit}>
                <Form formData={formData.current} colCount={2}>
                  <Item>
                    <TextBox
                      defaultValue="Smith"
                      showClearButton={true}
                      placeholder="Enter full name"
                      valueChangeEvent="keyup"
                      onValueChanged={valueChanged}
                    />
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
                  <ButtonItem>
                    <ButtonOptions
                      width={"100%"}
                      type={"default"}
                      useSubmitBehavior={true}
                    >
                      <span className="dx-button-text">Inserir</span>
                    </ButtonOptions>
                  </ButtonItem>
                </Form>
              </form>
            </Item>
            <Item>
              <h2 className={"content-block"}>Radar</h2>
              <Chart
                size={{ width: "auto", height: "600" }}
                className="chart"
                dataSource={data}
              >
                <CommonSeriesSettings type="scatter" />
                <Series argumentField="x" valueField="y">
                  <Point image={airplane} />
                </Series>
                <ArgumentAxis
                  defaultVisualRange={[-30, 30]}
                  tickInterval={1}
                  customPosition={0}
                  offset={0}
                >
                  <Grid visible={true} />
                </ArgumentAxis>

                <ValueAxis
                  defaultVisualRange={[-10, 10]}
                  tickInterval={1}
                  customPosition={0}
                  offset={0}
                />
                <Legend visible={false} />
              </Chart>
            </Item>
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
}
