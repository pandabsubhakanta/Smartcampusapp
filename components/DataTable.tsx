type Props = {
  title: string;
  headers: string[];
  rows: Array<Array<string | number>>;
};

export default function DataTable({ title, headers, rows }: Props) {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-900 p-4">
      <h2 className="mb-3 text-lg font-semibold">{title}</h2>
      <div className="overflow-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              {headers.map((h) => (
                <th key={h} className="p-2 text-slate-300">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className="border-b border-slate-800">
                {row.map((cell, cidx) => (
                  <td key={cidx} className="p-2">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
