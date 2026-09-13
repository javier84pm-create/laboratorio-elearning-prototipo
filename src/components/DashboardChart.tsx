"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { CourseCompletion } from "@/types";

export function DashboardChart({ data }: { data: CourseCompletion[] }) {
  return (
    <div className="surface p-5">
      <div className="mb-4">
        <h2 className="font-display text-lg font-semibold">Finalización por curso</h2>
        <p className="text-sm text-[var(--ink-muted)]">
          Tasa de completitud (%) — calculada desde la cohorte
        </p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d8dbeb" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: "#5c6280", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              interval={0}
              angle={-12}
              textAnchor="end"
              height={60}
            />
            <YAxis
              tick={{ fill: "#5c6280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
            />
            <Tooltip
              cursor={{ fill: "rgba(47,58,143,0.06)" }}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #d8dbeb",
                boxShadow: "0 8px 20px rgba(47,58,143,0.08)",
              }}
              formatter={(value) => [`${value}%`, "Finalización"]}
            />
            <Bar dataKey="rate" fill="#2f3a8f" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
