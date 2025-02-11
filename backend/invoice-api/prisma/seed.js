import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";

const prisma = new PrismaClient();

async function main() {
  await prisma.invoice.deleteMany();
  const data = await fs.readFile("prisma/invoices.json", "utf-8");
  const invoices = JSON.parse(data);

  for (const invoice of invoices) {
    await prisma.invoice.create({
      data: {
        invoiceNumber: invoice.invoiceNumber,
        clientName: invoice.clientName,
        clientEmail: invoice.clientEmail,
        status: invoice.status,
        issueDate: new Date(invoice.issueDate),
        dueDate: new Date(invoice.dueDate),
        paymentDate: invoice.paymentDate ? new Date(invoice.paymentDate) : null,
        amount: invoice.amount,
        currency: invoice.currency,
        discount: invoice.discount,
        tax: invoice.tax,
        paymentMethod: invoice.paymentMethod,
        category: invoice.category,
        tags: invoice.tags,
        notes: invoice.notes,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error("❌ Erro ao popular o banco:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
