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

  function distanciaEntrePontos(pontoUm, pontoDois) {
    console.log("pontoum", pontoUm, "pontoDois", pontoDois);
    let difX = pontoUm.x - pontoDois.x;
    let difY = pontoUm.y - pontoDois.y;
    return Math.sqrt(difX * difX + difY * difY);
  }

  function avioesProximosAoAeroporto(aeroporto, avioes, distanciaMinima) {
    let avioesProximos = [];

    avioes.forEach((aviao) => {
      const distancia = distanciaEntrePontos(
        { x: aeroporto.x, y: aeroporto.y },
        aviao
      );

      if (distancia <= distanciaMinima) {
        avioesProximos.push({ aviao, distancia });
        console.log(avioesProximos);
      }
    });

    return avioesProximos;
  }

  function avioesProximosAoOutro(avioes, distanciaMinima) {
    let avioesProximos = [];

    for (let i = 0; i < avioes.length; i++) {
      for (let z = i + 1; z < avioes.length; z++) {
        let aviaoUm = avioes[i];
        let aviaoDois = avioes[z];

        const distancia = distanciaEntrePontos(aviaoUm, aviaoDois);
        console.log(distancia, distanciaMinima, distancia <= distanciaMinima);

        if (distancia <= distanciaMinima) {
          avioesProximos.push({ avioes: [aviaoUm, aviaoDois], distancia });
        }
      }
    }

    return avioesProximos;
  }

  const proximoAeroporto = useRef({});
  const proximoOutros = useRef({});

  const [avioesProximosAeroporto, setAvioesProximosAeroporto] = useState([]);
  const [avioesProximos, setAvioesProximos] = useState([]);

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
          <Item>
            <Form formData={proximoAeroporto.current} colCount={1}>
              <Item
                dataField={"distancia"}
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
                    setAvioesProximos([]);
                    setAvioesProximosAeroporto([]);

                    const avioesProximos = avioesProximosAoAeroporto(
                      { x: 0, y: 0 },
                      data,
                      proximoAeroporto.current.distancia
                    );

                    setAvioesProximosAeroporto(avioesProximos);
                  }}
                  stylingMode="contained"
                />
              </Item>
            </Form>
          </Item>
          <Item>
            <Form formData={proximoOutros.current} colCount={1}>
              <Item
                dataField={"distancia"}
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
                    setAvioesProximos([]);
                    setAvioesProximosAeroporto([]);

                    const avioesProximos = avioesProximosAoOutro(
                      data,
                      proximoOutros.current.distancia
                    );

                    setAvioesProximos(avioesProximos);
                  }}
                  stylingMode="contained"
                />
              </Item>
            </Form>
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

          {avioesProximosAeroporto.map((it, i) => {
            return (
              <Item key={i}>
                Avião na posição x: {it.aviao.x} y: {it.aviao.y} próximo ao
                aeroporto.
              </Item>
            );
          })}
          {avioesProximos.map((it, i) => {
            return (
              <Item key={i}>
                Avião na posição x: {it.avioes[0].x} y: {it.avioes[0].y} próximo
                avião na posição x: {it.avioes[1].x} y: {it.avioes[1].y}.
              </Item>
            );
          })}
        </Form>
      </Popup>
    </React.Fragment>
  );
};
