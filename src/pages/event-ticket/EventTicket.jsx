import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import PageMeta from "../../components/seo/PageMeta";
import StatusPanel from "../../components/status/StatusPanel";
import DigitalCard from "../../components/digitalCard/DigitalCard";
import { AMEBA_EMAIL } from "../../utils/constants";
import ticketService from "../../store/services/ticket.service";

export default function EventTicket() {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [t] = useTranslation("translation");

  useEffect(() => {
    const parsed = Object.fromEntries(new URLSearchParams(location.search));
    const token = parsed["token"] || parsed["?token"];
    if (token) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    if (!token) {
      setLoading(false);
      return;
    }
    ticketService
      .getEventTicket(token)
      .then((data) => setTicket(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [location.search]);

  const attendeeName =
    [ticket?.first_name, ticket?.last_name].filter(Boolean).join(" ") ||
    ticket?.user_name;

  return (
    <PageLayout section="status" centered>
      <PageMeta title={t("ticket.meta-title")} url="/event-ticket" />
      {loading ? (
        <StatusPanel loading />
      ) : ticket ? (
        <StatusPanel
          eyebrow={t("ticket.eyebrow")}
          title={ticket.event}
          text={t("ticket.text")}
        >
          <DigitalCard
            badge={t(ticket.checked_in ? "ticket.checked-in" : "ticket.pending")}
            title={ticket.event}
            subtitle={attendeeName}
            rows={[
              { label: t("ticket.assistent"), value: attendeeName },
              { label: t("ticket.variant"), value: ticket.variants || "—" },
            ]}
          />
        </StatusPanel>
      ) : (
        <StatusPanel
          tone="error"
          eyebrow={t("ticket.eyebrow")}
          title={t("errors.general")}
          text={
            <>
              {t("errors.contacta")}
              <a href={`mailto:${AMEBA_EMAIL}`}>{AMEBA_EMAIL}</a>.
            </>
          }
        />
      )}
    </PageLayout>
  );
}
