import { useState } from "react";
import Pagination from "./Pagination";

export default {
  title: "Components/Pagination",
  component: Pagination,
};

function PaginationDemo(args) {
  const [page, setPage] = useState(args.page ?? 0);
  return <Pagination {...args} page={page} onPageChange={setPage} />;
}

export const Default = {
  render: (args) => <PaginationDemo {...args} />,
  args: { page: 0, totalPages: 5, scrollToTop: false },
};

export const MiddlePage = {
  render: (args) => <PaginationDemo {...args} />,
  args: { page: 2, totalPages: 5, scrollToTop: false },
};

export const LastPage = {
  render: (args) => <PaginationDemo {...args} />,
  args: { page: 4, totalPages: 5, scrollToTop: false },
};
