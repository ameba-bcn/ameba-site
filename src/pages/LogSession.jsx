import React from "react";
import LogComponent from "./../components/user/LogComponent";
import PageLayout from "../components/layout/PageLayout/PageLayout";

export default function LogSession() {
  return (
    <PageLayout section="auth">
      <LogComponent />
    </PageLayout>
  );
}
