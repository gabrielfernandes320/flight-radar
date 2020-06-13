import React, { useEffect, useState } from "react";
import Form, { Item } from "devextreme-react/form";
import { Button, DateBox } from "devextreme-react";
import { api } from "../../services/api";
import { SelectBox } from "devextreme-react/select-box";
import ptMessages from "devextreme/localization/messages/pt.json";
import { CheckBox } from "devextreme-react/check-box";
import { Popup } from "devextreme-react/popup";
import { useAuth, getToken, getRefreshTokenCode } from "../../contexts/auth";

import { locale, loadMessages } from "devextreme/localization";

loadMessages(ptMessages);

locale("pt");

export default function DataLoader(props) {
  const [finalDate, setFinalDate] = useState(new Date("2020-01-01T23:00:00"));
  const [initialDate, setInitialDate] = useState(
    new Date("2016-12-31T00:00:00")
  );
  //initialDate.setMonth(initialDate.getMonth() - 2);
  const [data, setData] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [userId, setUserId] = useState(0);
  const [users, setUsers] = useState([]);
  const [programId, setProgramId] = useState(0);
  const [programs, setPrograms] = useState([]);
  const [taskId, setTaskId] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [fillTypeId, setFillTypeId] = useState(0);
  const [fillTypes, setFillTypes] = useState([]);
  const [sectorId, setSectorId] = useState(0);
  const [sectors, setSectors] = useState([]);
  const [processId, setProcessId] = useState(0);
  const [processes, setProcesses] = useState([]);
  const [processAreaId, setProcessAreaId] = useState(0);
  const [processAreas, setprocessAreas] = useState([]);
  const [taskTypeId, setTaskTypeId] = useState(0);
  const [status, setStatus] = useState(true);
  const [taskTypes, setTasktypes] = useState([]);
  const [errorPopupMessage, setErrorPopupMessage] = useState("");
  const [popVisible, setPopVisible] = useState(false);
  const [errorPopupVisible, setErrorPopupVisible] = useState(false);
  const [reqErrorStatus, setReqErrorStatus] = useState(null);
  const [analysisGroupId, SetAnalysisGroupId] = useState(0);
  const [analysisGroup, SetAnalysisGroup] = useState([]);
  const [analysisTypeId, SetAnalysisTypeId] = useState(0);
  const [analysisType, SetAnalysisType] = useState([]);
  const [productId, SetProductId] = useState(0);
  const [products, SetProducts] = useState([]);
  const [stopTypes, SetStopTypes] = useState([
    { id: 0, value: "Área" },
    { id: 1, value: "Processo" },
  ]);
  const [stopTypeId, SetStopTypeId] = useState(1);
  const [minimunStop, SetMinimunStop] = useState(0);
  const [stopReasonId, SetStopReasonId] = useState(0);
  const [stopReasons, SetStopReasons] = useState([]);
  const [stopOriginId, SetStopOriginId] = useState(0);
  const [stopOrigins, SetStopOrigins] = useState([]);
  const [companyUnitId, SetCompanyUnitId] = useState(0);
  const [companyUnits, SetCompanyUnits] = useState([]);
  const [isStopTypeAut, setIsStopTypeAut] = useState(null);

  const stopManAut = [
    { Id: true, Value: "Automática" },
    { Id: false, Value: "Manual" },
  ];

  const [processAreaBoxDisabled, SetProcessAreaBoxDisabled] = useState(false);

  let filters = {};

  function mountFilters() {
    filters = { ...filters, ...props.baseFilters };

    if (props.allowedFilters.date) {
      filters.initialDate = initialDate;
      filters.finalDate = finalDate;
    }
    if (props.allowedFilters.user) {
      filters.userId = isNaN(userId) ? setUserId(0) : userId;
    }
    if (props.allowedFilters.program) {
      filters.programId = isNaN(programId) ? setProgramId(0) : programId;
    }
    if (props.allowedFilters.tasks) {
      filters.taskId = isNaN(taskId) ? setTaskId(0) : taskId;
    }
    if (props.allowedFilters.fillType) {
      filters.fillTypeId = isNaN(fillTypeId) ? setFillTypeId(0) : fillTypeId;
    }
    if (props.allowedFilters.sector) {
      filters.sectorId = isNaN(sectorId) ? setSectorId(0) : sectorId;
    }
    if (props.allowedFilters.process) {
      filters.processId = isNaN(processId) ? setProcessId(0) : processId;
    }
    if (props.allowedFilters.processArea) {
      filters.processAreaId = isNaN(processAreaId)
        ? setProcessAreaId(0)
        : processAreaId;
    }
    if (props.allowedFilters.taskType) {
      filters.taskType = isNaN(taskTypeId) ? setTaskTypeId(0) : taskTypeId;
    }
    if (props.allowedFilters.status) {
      filters.status = status;
    }
    if (props.allowedFilters.analysisGroup) {
      filters.analysisGroupId = isNaN(analysisGroupId)
        ? SetAnalysisGroupId(0)
        : analysisGroupId;
    }
    if (props.allowedFilters.analysisType) {
      filters.analysisTypeId = isNaN(analysisTypeId)
        ? SetAnalysisTypeId(0)
        : analysisTypeId;
    }
    if (props.allowedFilters.products) {
      filters.productId = isNaN(productId) ? SetProductId(0) : productId;
    }
    if (props.allowedFilters.stopType) {
      filters.stopTypeId = stopTypeId;
    }
    if (props.allowedFilters.minStop) {
      filters.minStop = minimunStop;
    }
    if (props.allowedFilters.stopReason) {
      filters.stopReasonId = stopReasonId;
    }
    if (props.allowedFilters.stopOrigin) {
      filters.stopOriginId = stopOriginId;
    }
    if (props.allowedFilters.companyUnit) {
      filters.companyUnitId = isNaN(companyUnitId)
        ? SetCompanyUnitId(0)
        : companyUnitId;
    }
    if (props.allowedFilters.stopManAut) {
      filters.isStopTypeAut = isStopTypeAut;
    }
    console.log(filters);
  }

  const { validateToken, logOut, valid, refreshToken } = useAuth();
  useEffect(() => {
    async function valid() {
      await validateToken(getToken());
    }
    valid();
  }, [validateToken]);

  function handleApiError(response) {
    if (response) {
      setReqErrorStatus(response.status);
      setErrorPopupMessage(
        `Status: ${response.status} \n\n\n\n Mensagem: ${response.statusText}`
      );
      setErrorPopupVisible(true);
    }
  }

  useEffect(() => {
    if (props.allowedFilters.user) {
      async function loadUsers() {
        await api
          .get("/dataforfilters/users")
          .then((response) => {
            setUsers(response.data);
          })
          .catch((error) => {
            handleApiError(error.response);
          });
      }

      loadUsers();
    }
  }, [props.allowedFilters.user]);

  useEffect(() => {
    if (props.allowedFilters.program) {
      async function loadPrograms() {
        await api
          .get("/dataforfilters/programs")
          .then((response) => {
            setPrograms(response.data);
          })
          .catch((error) => {
            handleApiError(error.response);
          });
      }
      loadPrograms();
    }
  }, [props.allowedFilters.program]);

  useEffect(() => {
    if (props.allowedFilters.tasks) {
      async function loadTaskTypes() {
        await api
          .get("/dataforfilters/Tasks")
          .then((response) => {
            setTasks(response.data);
          })
          .catch((error) => {
            handleApiError(error.response);
          });
      }
      loadTaskTypes();
    }
  }, [props.allowedFilters.tasks]);

  useEffect(() => {
    if (props.allowedFilters.fillType) {
      async function loadFillTypes() {
        await api
          .get("/dataforfilters/filltypes")
          .then((response) => {
            setFillTypes(response.data);
          })
          .catch((error) => {
            handleApiError(error.response);
          });
      }

      loadFillTypes();
    }
  }, [props.allowedFilters.fillType]);

  useEffect(() => {
    if (props.allowedFilters.sector) {
      async function loadSectors() {
        await api
          .get("/dataforfilters/sectors")
          .then((response) => {
            setSectors(response.data);
          })
          .catch((error) => {
            handleApiError(error.response);
          });
      }

      loadSectors();
    }
  }, [props.allowedFilters.sector]);

  useEffect(() => {
    if (props.allowedFilters.process) {
      async function loadProcesses() {
        await api
          .get("/dataforfilters/processes")
          .then((response) => {
            setProcesses(response.data);
          })
          .catch((error) => {
            handleApiError(error.response);
          });
      }

      loadProcesses();
    }
  }, [props.allowedFilters.process]);

  useEffect(() => {
    if (props.allowedFilters.processArea) {
      SetProcessAreaBoxDisabled(
        props.allowedFilters.stopType ? (stopTypeId == 1 ? true : false) : false
      );
      async function loadProcessAreas() {
        await api
          .get("/dataforfilters/processAreas")
          .then((response) => {
            setprocessAreas(response.data);
          })
          .catch((error) => {
            handleApiError(error.response);
          });
      }

      loadProcessAreas();
    }
  }, [
    props.allowedFilters.processArea,
    props.allowedFilters.stopType,
    stopTypeId,
  ]);

  useEffect(() => {
    if (props.allowedFilters.taskType) {
      async function loadTaskTypes() {
        await api
          .get("/dataforfilters/tasktypes")
          .then((response) => {
            setTasktypes(response.data);
          })
          .catch((error) => {
            handleApiError(error.response);
          });
      }

      loadTaskTypes();
    }
  }, [props.allowedFilters.taskType]);

  useEffect(() => {
    if (props.allowedFilters.analysisGroup) {
      async function loadData() {
        await api
          .get("/dataforfilters/analysisGroups")
          .then((response) => {
            SetAnalysisGroup(response.data);
          })
          .catch((error) => {
            handleApiError(error.response);
          });
      }

      loadData();
    }
  }, [props.allowedFilters.analysisGroup]);

  useEffect(() => {
    if (props.allowedFilters.analysisType) {
      async function loadData() {
        await api
          .get("/dataforfilters/analysisTypes")
          .then((response) => {
            SetAnalysisType(response.data);
          })
          .catch((error) => {
            handleApiError(error.response);
          });
      }

      loadData();
    }
  }, [props.allowedFilters.analysisType]);

  useEffect(() => {
    if (props.allowedFilters.products) {
      async function loadData() {
        await api
          .get("/dataforfilters/products")
          .then((response) => {
            SetProducts(response.data);
          })
          .catch((error) => {
            handleApiError(error.response);
          });
      }

      loadData();
    }
  }, [props.allowedFilters.products]);

  useEffect(() => {
    if (props.allowedFilters.stopReason) {
      async function loadData() {
        await api
          .get("/dataforfilters/stopReasons")
          .then((response) => {
            SetStopReasons(response.data);
          })
          .catch((error) => {
            handleApiError(error.response);
          });
      }

      loadData();
    }
  }, [props.allowedFilters.stopReason]);

  useEffect(() => {
    if (props.allowedFilters.stopOrigin) {
      async function loadData() {
        await api
          .get("/dataforfilters/stoporigins")
          .then((response) => {
            SetStopOrigins(response.data);
          })
          .catch((error) => {
            handleApiError(error.response);
          });
      }

      loadData();
    }
  }, [props.allowedFilters.stopOrigin]);

  useEffect(() => {
    if (props.allowedFilters.companyUnit) {
      async function loadData() {
        await api
          .get("/dataforfilters/companyunits")
          .then((response) => {
            SetCompanyUnits(response.data);
          })
          .catch((error) => {
            handleApiError(error.response);
          });
      }

      loadData();
    }
  }, [props.allowedFilters.companyUnit]);

  async function handleLogout() {
    logOut();
  }

  async function handleSubmit(e) {
    await validateToken(getToken());

    if (valid) {
      await refreshToken(getToken(), getRefreshTokenCode());
    }
    setDataLoading(true);
    mountFilters();
    await api
      .get(props.url, {
        params: filters,
      })
      .then((response) => {
        setData(response.data);
        setDataLoading(false);
      })
      .catch((error) => {
        // Error 😨
        if (error.response) {
          setReqErrorStatus(error.response.status);
          setErrorPopupMessage(`Mensagem: ${error.response.data.message}`);
          setErrorPopupVisible(true);
          setDataLoading(false);
        } else if (error.request) {
          setErrorPopupMessage(`Mensagem: ${error.request}`);
        } else {
          setErrorPopupMessage(`Mensagem: ${error}`);
        }
      });
  }

  props.dataSource(data);
  props.dataLoadingStatus(dataLoading);

  function changePopupVisibility() {
    popVisible === true ? setPopVisible(false) : setPopVisible(true);
  }

  function changeErrorPopupVisibility() {
    errorPopupVisible === true
      ? setErrorPopupVisible(false)
      : setErrorPopupVisible(true);
  }

  return (
    <React.Fragment>
      <Button
        className="btn"
        text="Pesquisar"
        type="default"
        stylingMode="contained"
        onClick={handleSubmit}
      />

      <Button
        className="btn"
        icon="filter"
        stylingMode="text"
        text="Filtros"
        type="default"
        onClick={changePopupVisibility}
      />
      <Popup
        className="pop-up"
        visible={popVisible}
        onHiding={changePopupVisibility}
        dragEnabled={true}
        resizeEnabled={true}
        closeOnOutsideClick={true}
        showTitle={true}
        title="Filtros"
        width={"fit-content"}
        height={"fit-content"}
      >
        <Form colCount={2} className="form">
          {props.baseFiltersComponents &&
            props.baseFiltersComponents.map((item, index) => (
              <Item>{item}</Item>
            ))}
          {props.allowedFilters.date && (
            <Item>
              <div className="dx-field-label">Data inicial</div>
              <DateBox
                width="max-content"
                value={initialDate}
                //displayFormat="dd/MM/yyyy, hh:mm"
                type="datetime"
                onValueChanged={(event) => setInitialDate(event.value)}
              />
            </Item>
          )}
          {props.allowedFilters.date && (
            <Item>
              <div className="dx-field-label">Data Final</div>
              <DateBox
                width="fit-content"
                value={finalDate}
                type="datetime"
                //displayFormat="dd/MM/yyyy, hh:mm"
                onValueChanged={(event) => setFinalDate(event.value)}
              />
            </Item>
          )}
          {props.allowedFilters.user && (
            <Item>
              <div className="dx-field-label">Usuário</div>
              <SelectBox
                width="fit-content"
                searchEnabled={true}
                text="Usuario"
                showClearButton={true}
                dataSource={users}
                //acceptCustomValue={true}
                valueExpr="CodUsuario"
                displayExpr="NomLoginUsuario"
                onValueChanged={(event) => setUserId(event.value)}
              />
            </Item>
          )}
          {props.allowedFilters.program && (
            <Item>
              <div className="dx-field-label">Programa</div>
              <SelectBox
                searchEnabled={true}
                width="fit-content"
                text="Programa"
                showClearButton={true}
                dataSource={programs}
                //acceptCustomValue={true}
                valueExpr="CodPrograma"
                displayExpr={"NomPrograma"}
                onValueChanged={(event) => setProgramId(event.value)}
              />
            </Item>
          )}
          {props.allowedFilters.tasks && (
            <Item>
              <div className="dx-field-label">Tarefa</div>
              <SelectBox
                searchEnabled={true}
                width="fit-content"
                text="Tarefa"
                showClearButton={true}
                dataSource={tasks}
                valueExpr="CodTarefa"
                displayExpr={"NomTarefa"}
                onValueChanged={(event) => setTaskId(event.value)}
              />
            </Item>
          )}

          {props.allowedFilters.fillType && (
            <Item>
              <div className="dx-field-label">Tipo de preenchimento</div>
              <SelectBox
                searchEnabled={true}
                width="fit-content"
                text="Tipos de Preenchimento"
                showClearButton={true}
                dataSource={fillTypes}
                //acceptCustomValue={true}
                valueExpr="Id"
                displayExpr="Value"
                onValueChanged={(event) => setFillTypeId(event.value)}
              />
            </Item>
          )}
          {props.allowedFilters.companyUnit && (
            <Item>
              <div className="dx-field-label">Unidade</div>
              <SelectBox
                searchEnabled={true}
                width="fit-content"
                text="Unidade"
                showClearButton={true}
                dataSource={companyUnits}
                acceptCustomValue={true}
                valueExpr="Id"
                displayExpr="Value"
                onValueChanged={(event) => SetCompanyUnitId(event.value)}
              />
            </Item>
          )}
          {props.allowedFilters.stopType && (
            <Item>
              <div className="dx-field-label">Tipo de Parada</div>
              <SelectBox
                searchEnabled={true}
                width="fit-content"
                text="Tipo"
                defaultValue={stopTypes[1].id}
                showClearButton={true}
                dataSource={stopTypes}
                acceptCustomValue={true}
                valueExpr="id"
                displayExpr="value"
                onValueChanged={(event) => {
                  SetStopTypeId(event.value);
                }}
              />
            </Item>
          )}
          {props.allowedFilters.sector && (
            <Item>
              <div className="dx-field-label">Setor</div>
              <SelectBox
                searchEnabled={true}
                width="fit-content"
                text="Setor"
                showClearButton={true}
                dataSource={sectors}
                //acceptCustomValue={true}
                valueExpr="CodSetor"
                displayExpr="NomSetor"
                onValueChanged={(event) => setSectorId(event.value)}
              />
            </Item>
          )}
          {props.allowedFilters.process && (
            <Item>
              <div className="dx-field-label">Processo</div>
              <SelectBox
                searchEnabled={true}
                width="fit-content"
                text="Processo"
                showClearButton={true}
                dataSource={
                  sectorId === 0 || sectorId === null
                    ? processes
                    : processes.filter((x) => x.CodSetor == sectorId)
                }
                //acceptCustomValue={true}
                valueExpr="CodProcesso"
                displayExpr="NomProcesso"
                onValueChanged={(event) => {
                  setProcessId(event.value);
                }}
              />
            </Item>
          )}
          {props.allowedFilters.processArea && (
            <Item>
              <div className="dx-field-label">Área</div>
              <SelectBox
                disabled={processAreaBoxDisabled}
                searchEnabled={true}
                width="fit-content"
                text="Área"
                showClearButton={true}
                // dataSource={processAreas}
                dataSource={
                  processId === 0 || processId === null
                    ? processAreas
                    : processAreas.filter((x) => x.CodProcesso == processId)
                }
                //acceptCustomValue={true}
                valueExpr="CodAreaProcesso"
                displayExpr="NomAreaProcesso"
                onValueChanged={(event) => setProcessAreaId(event.value)}
              />
            </Item>
          )}
          {props.allowedFilters.taskType && (
            <Item>
              <div className="dx-field-label">Tipo de Tarefa</div>
              <SelectBox
                searchEnabled={true}
                width="fit-content"
                text="Tipo"
                showClearButton={true}
                dataSource={taskTypes}
                acceptCustomValue={true}
                valueExpr="Id"
                displayExpr="Value"
                onValueChanged={(event) => setTaskTypeId(event.value)}
              />
            </Item>
          )}
          {props.allowedFilters.status && (
            <Item>
              <div className="dx-field-label">Ativo?</div>
              <CheckBox
                className="checkBoxContainer"
                defaultValue={true}
                onValueChanged={(event) => setStatus(event.value)}
              />
            </Item>
          )}
          {props.allowedFilters.analysisGroup && (
            <Item>
              <div className="dx-field-label">Grupo</div>
              <SelectBox
                searchEnabled={true}
                width="fit-content"
                text="Grupo"
                showClearButton={true}
                dataSource={analysisGroup}
                acceptCustomValue={true}
                valueExpr="CodAnaliseGrupo"
                displayExpr="NomAnaliseGrupo"
                onValueChanged={(event) => SetAnalysisGroupId(event.value)}
              />
            </Item>
          )}
          {props.allowedFilters.analysisType && (
            <Item>
              <div className="dx-field-label">Analise</div>
              <SelectBox
                searchEnabled={true}
                width="fit-content"
                text="Analise"
                showClearButton={true}
                dataSource={
                  analysisGroupId === 0 || analysisGroupId === null
                    ? analysisType
                    : analysisType.filter(
                        (x) => x.CodAnaliseGrupo == analysisGroupId
                      )
                }
                acceptCustomValue={true}
                valueExpr="CodAnalise"
                displayExpr="NomAnalise"
                onValueChanged={(event) => SetAnalysisTypeId(event.value)}
              />
            </Item>
          )}
          {props.allowedFilters.products && (
            <Item>
              <div className="dx-field-label">Produto</div>
              <SelectBox
                searchEnabled={true}
                width="fit-content"
                text="Produto"
                showClearButton={true}
                dataSource={products}
                acceptCustomValue={true}
                valueExpr="Id"
                displayExpr="Value"
                onValueChanged={(event) => SetProductId(event.value)}
              />
            </Item>
          )}
          {props.allowedFilters.minStop && (
            <Item>
              <div className="dx-field-label">Parada minima de (HH:mm)</div>
              <DateBox
                type="time"
                useMaskBehavior={true}
                displayFormat="HH:mm"
                placeholder="00:00"
                onValueChanged={(event) => {
                  SetMinimunStop(
                    event.value.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  );
                }}
              />
            </Item>
          )}
          {props.allowedFilters.stopReason && (
            <Item>
              <div className="dx-field-label">Motivo</div>
              <SelectBox
                searchEnabled={true}
                width="fit-content"
                text="Motivo"
                showClearButton={true}
                dataSource={stopReasons}
                acceptCustomValue={true}
                valueExpr="Id"
                displayExpr="Value"
                onValueChanged={(event) => SetStopReasonId(event.value)}
              />
            </Item>
          )}
          {props.allowedFilters.stopOrigin && (
            <Item>
              <div className="dx-field-label">Origem</div>
              <SelectBox
                searchEnabled={true}
                width="fit-content"
                text="Origem"
                showClearButton={true}
                dataSource={stopOrigins}
                acceptCustomValue={true}
                valueExpr="Id"
                displayExpr="Value"
                onValueChanged={(event) => SetStopOriginId(event.value)}
              />
            </Item>
          )}
          {props.allowedFilters.stopManAut && (
            <Item>
              <div className="dx-field-label">Parada</div>
              <SelectBox
                text="Parada"
                showClearButton={true}
                dataSource={stopManAut}
                acceptCustomValue={true}
                valueExpr="Id"
                displayExpr={"Value"}
                onValueChanged={(event) => setIsStopTypeAut(event.value)}
              />
            </Item>
          )}
        </Form>
        <Button
          className="form-btn"
          text="Pesquisar"
          type="default"
          stylingMode="contained"
          onClick={() => {
            handleSubmit();
            changePopupVisibility();
          }}
        />
      </Popup>
      <Popup
        title="Erro"
        className="pop-up"
        visible={errorPopupVisible}
        onHiding={changeErrorPopupVisibility}
        dragEnabled={true}
        resizeEnabled={true}
        closeOnOutsideClick={true}
        showTitle={true}
        width={"fit-content"}
        height={"fit-content"}
      >
        {reqErrorStatus === 401 ? (
          <div>
            <h6>Sua sessão expirou! Deseja retornar para a tela de login?</h6>
          </div>
        ) : (
          <div>
            <h6>{errorPopupMessage}- Deseja retornar para a tela de login? </h6>
          </div>
        )}
        <div>
          <Button
            className="form-btn"
            text="Sim"
            type="default"
            stylingMode="contained"
            onClick={() => {
              handleLogout();
              changePopupVisibility();
            }}
          />
          <Button
            className="form-btn"
            text="Não"
            type="default"
            stylingMode="contained"
            onClick={() => {
              changeErrorPopupVisibility();
            }}
          />
        </div>
      </Popup>
    </React.Fragment>
  );
}
