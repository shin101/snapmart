import React from "react";
import Layout from "@components/layout";
import TextArea from "@components/textarea";

const Write = () => {
  return (
    <Layout canGoBack>
      <form className="px-4 py-20">
        <TextArea required placeholder="Ask a question" />{" "}
      </form>
    </Layout>
  );
};

export default Write;
