// app/production-styles/[style]/[vendor]/page.tsx
import React from "react";
import Dashboard from "@/components/core/Dashboard";
import { notFound } from "next/navigation";

const convertKebabToTitle = (kebab: string) =>
  kebab.split("-").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ");

const StyleDashboardPage = async ({
  params,
}: {
  params: { style: string; vendor: string };
}) => {
  const { style, vendor } = params;

  if (!style || !vendor) return notFound();

  const styleName = convertKebabToTitle(style);
  const vendorName = convertKebabToTitle(vendor);

  return <Dashboard styleName={styleName} vendorName={vendorName} />;
};

export default StyleDashboardPage;