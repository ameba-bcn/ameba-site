import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Redirect } from "react-router-dom";
import {
  formatDateToHour,
  formatISODateToDate,
  sortByDate,
} from "../../../utils/utils";
import Icon from "../../../components/ui/Icon";
import ActivitatDialog from "./Activitat";
import {
  StyledAgendaTable,
  StyledImageTableBox,
  StyledTicket,
} from "./AgendaTable.styled";
import axiosInstance from "../../../axios";
import { API_URL, MOBILE_SEMI_BIG } from "../../../utils/constants";
import { addToCart } from "../../../store/actions/cart";
import SearchBox from "../../../components/searchBox/SearchBox";
import useMediaQuery from "../../../hooks/use-media-query";

const AgendaTable = () => {
  const { agenda } = useSelector((state) => state.data);
  const { user_profile = "" } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const checkoutRedirect = user_profile === "GUEST" ? "/login" : "/checkout";
  const [t] = useTranslation("translation");
  const isSmallScreen = useMediaQuery(MOBILE_SEMI_BIG);
  const today = new Date();
  const todayIsoString = today.toISOString();

  const eventIconMapper = (data, price, stock, eventDate, cancelled) => {
    // Evento cancelado
    if (cancelled)
      return (
        <Icon
          icon="cancelled"
          className="cardActivitat"
          disabled={false}
          type="hoverable-cream"
          onClick={() => fetchEvent(data)}
          tooltip={t("events.tooltip.cancelado")}
        />
      );

    // Evento caducado
    if (todayIsoString > eventDate)
      return (
        <Icon
          icon="cancelled"
          className="cardActivitat"
          disabled={true}
          type="hoverable-cream"
          onClick={() => fetchEvent(data)}
          tooltip={t("events.tooltip.caducado")}
        />
      );

    // Evento gratuito con inscripción
    if (price === 0 && stock != -1)
      return (
        <Icon
          icon="assist"
          className="cardActivitat"
          disabled={false}
          type="hoverable-cream"
          onClick={() => data?.has_stock && fetchAndAdd(data)}
          tooltip={t("events.tooltip.gratis-inscripcion")}
        />
      );

    // Evento gratuito con inscripción aforo completo
    if (price === 0 && stock === 0)
      return (
        <Icon
          icon="assist"
          className="cardActivitat"
          disabled={true}
          type="hoverable-cream"
          onClick={() => fetchEvent(data)}
          tooltip={t("events.tooltip.gratis-aforo-completo")}
        />
      );

    // Evento gratuito
    if (price === 0 && stock === -1)
      return (
        <Icon
          icon="assist"
          className="cardActivitat"
          disabled={false}
          type="hoverable-cream"
          onClick={() => fetchEvent(data)}
          tooltip={t("events.tooltip.gratis")}
        />
      );

    // Evento de pago sold out
    if (price !== 0 && stock === 0)
      return (
        <Icon
          icon="ticket"
          className="cardActivitat"
          disabled={true}
          type="hoverable-cream"
          onClick={() => fetchEvent(data)}
          tooltip={t("events.tooltip.pago-sold")}
        />
      );

    // Evento de pago en taquilla
    if (price !== 0 && stock === -1)
      return (
        <Icon
          icon="ticket"
          className="cardActivitat"
          disabled={false}
          type="hoverable-cream"
          onClick={() => data?.has_stock && fetchAndAdd(data)}
          tooltip={t("events.tooltip.pago-taquilla")}
        />
      );

    // Evento de pago
    if (price !== 0 && stock > 0)
      return (
        <Icon
          icon="ticket"
          className="cardActivitat"
          disabled={false}
          type="hoverable-cream"
          onClick={() => data?.has_stock && fetchAndAdd(data)}
          tooltip={t("events.tooltip.pago")}
        />
      );

    return (
      <Icon
        icon="cancelled"
        className="cardActivitat"
        disabled={true}
        type="hoverable-cream"
        onClick={() => fetchEvent(data)}
        tooltip={t("events.tooltip.caducado")}
      />
    );
  };

  const [eventData, setEventData] = useState([
    {
      id: 0,
      name: "",
      price: "",
      images: [""],
      discount: "",
      datetime: "",
      address: "",
      description: "",
      saved: "",
      purchased: "",
      stock: 0,
      is_active: false,
      artists: [false],
    },
  ]);

  const fetchAndAdd = (rowData) => {
    axiosInstance
      .get(`${API_URL}events/${rowData.id}`, {})
      .then((res) => {
        const { variants } = res.data;
        dispatch(addToCart(variants[0]?.id));
      })
      .then(setRedirect(true))
      .catch((error) => {
        console.warn("ERROR", error.response);
      });
  };

  const fetchEvent = (data) => {
    setLoading(true);
    axiosInstance
      .get(`${API_URL}events/${data.id}`, {})
      .then((res) => {
        setEventData(res.data);
        setLoading(false);
      })
      .then(() => setOpen(true))
      .catch((err) => {
        setLoading(false);
        console.warn("ERROR: ", err);
      });
  };

  const columns = React.useMemo(
    () => [
      {
        header: "",
        id: "search-box-row",
        columns: [
          {
            accessorKey: "name",
            header: () => <span>{t("agenda.activitat").toUpperCase()}</span>,
            cell: (info) => {
              const { name, images } = info.row.original;
              return (
                <StyledImageTableBox>
                  <div className="image-side">
                    <img src={images} className="imgMiniActivitat" alt="" />
                  </div>
                  <div className="title-side">
                    <h1>{name?.toUpperCase()}</h1>
                  </div>
                </StyledImageTableBox>
              );
            },
            size: 200,
          },
          {
            accessorKey: "datetime",
            header: () => <span>{t("agenda.data").toUpperCase()}</span>,
            cell: (info) => (
              <div className="horaDataActivitat">
                <h1>{formatISODateToDate(info.getValue())}</h1>
              </div>
            ),
            sortDescFirst: true,
            minSize: 200,
          },
          {
            accessorKey: "datetimehour",
            header: () => "HORA",
            cell: (info) => {
              const { datetime } = info.row.original;
              return (
                <div className="horaDataActivitat">
                  <h1>{formatDateToHour(datetime)}</h1>
                </div>
              );
            },
            enableSorting: true,
          },
          {
            accessorKey: "reserva",
            header: () => <span>RESERVA</span>,
            cell: (info) => {
              const { price, stock, datetime } = info.row.original;
              return (
                <StyledTicket>
                  {eventIconMapper(
                    info.row.original,
                    price,
                    stock,
                    datetime,
                    info.row.original.cancelled
                  )}
                </StyledTicket>
              );
            },
          },
        ].filter((column) =>
          isSmallScreen
            ? column.accessorKey !== "reserva" &&
              column.accessorKey !== "datetimehour"
            : column
        ),
      },
    ],
    [isSmallScreen]
  );

  const filteredAgenda = React.useMemo(
    () =>
      sortByDate(agenda).filter((activity) =>
        activity?.name?.toLowerCase()?.includes(searchInput?.toLowerCase())
      ),
    [agenda]
  );

  const table = useReactTable({
    data: filteredAgenda,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (redirect) return <Redirect to={checkoutRedirect} />;

  return (
    <StyledAgendaTable>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.id.includes("search-box") ? (
                    <div className="search-row">
                      <SearchBox
                        searchText="Busca"
                        searchInput={searchInput}
                        setSearchInput={setSearchInput}
                      />
                    </div>
                  ) : null}
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      onClick={() =>
                        cell.column.id !== "reserva" && fetchEvent(row.original)
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {open && (
        <ActivitatDialog
          open={open}
          dataRow={eventData}
          onClose={() => setOpen(false)}
          setEventData={setEventData}
          loading={loading}
        />
      )}
    </StyledAgendaTable>
  );
};

export default AgendaTable;
