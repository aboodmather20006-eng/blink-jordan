'use client';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { sizeGuides } from '@/data/size-guide';
export function SizeGuide() {
  return (
    <div className="size-guide">
      <p className="muted">
        Demo measurements in centimeters. These are sample guides, not confirmed
        BLINK measurements.
      </p>
      <Tabs defaultValue="Tops">
        <TabsList>
          {Object.keys(sizeGuides).map((name) => (
            <TabsTrigger key={name} value={name}>
              {name}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.entries(sizeGuides).map(([name, guide]) => (
          <TabsContent key={name} value={name}>
            <Table>
              <TableHeader>
                <TableRow>
                  {guide.columns.map((col) => (
                    <TableHead key={col}>{col}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {guide.rows.map((row) => (
                  <TableRow key={row[0]}>
                    {row.map((cell, i) => (
                      <TableCell key={i}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        ))}
      </Tabs>
      <p className="muted">
        Measure a similar garment laid flat. For shoes, measure from heel to
        longest toe.
      </p>
    </div>
  );
}
