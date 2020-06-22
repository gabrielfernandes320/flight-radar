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
  Grid,
  Export,
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
import RadarGrid from "./RadarGrid";
import RastreabilityFuncs from "./RastreabilityFuncs";

export default function () {
  const formData = useRef({});

  const { user, data, setData } = useAuth();

  return (
    <React.Fragment>
      <div className={"content-block"}>
        <div className={"dx-card responsive-paddings"}>
          <Form colCount={2}>
            <Item>
              <RadarGrid />
            </Item>
            <Item>
              <RastreabilityFuncs />
            </Item>
          </Form>

          <Form colCount={1}>
            <Item>
              <h2 className={"content-block"}>Radar</h2>
              <Chart
                size={{ width: "auto", height: "600" }}
                className="chart"
                dataSource={data}
                customizePoint={() => {
                  return {
                    image: {
                      url: airplane,
                      width: 20,
                      height: 20,
                    },
                    visible: true,
                  };
                }}
              >
                <CommonSeriesSettings type="scatter" />
                <Series argumentField="x" valueField="y">
                  <Point visible={true} />
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
                <Export enabled={true} />
                <Legend visible={false} />
              </Chart>
            </Item>
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
}
