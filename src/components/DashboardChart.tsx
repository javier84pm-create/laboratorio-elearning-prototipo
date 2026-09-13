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
            <CartesianGrid strokeDasharray="3 3" stroke="#d5e6e1" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: "#5a736e", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              interval={0}
              angle={-12}
              textAnchor="end"
              height={60}
            />
            <YAxis
              tick={{ fill: "#5a736e", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
            />
            <Tooltip
              cursor={{ fill: "rgba(13,107,92,0.06)" }}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #d5e6e1",
                boxShadow: "0 8px 20px rgba(13,107,92,0.08)",
              }}
              formatter={(value) => [`${value}%`, "Finalización"]}
            />
            <Bar dataKey="rate" fill="#0d6b5c" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
