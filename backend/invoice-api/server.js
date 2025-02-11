import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

app.get("/invoices", async (req, res) => {
  try {
    const invoices = await prisma.invoice.findMany();
    res.json(invoices);
  } catch (error) {
    console.error("Erro ao buscar invoices:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.post("/invoices", async (req, res) => {
  try {
    const invoice = await prisma.invoice.create({
      data: req.body,
    });
    res.status(201).json(invoice);
  } catch (error) {
    console.error("Erro ao adicionar invoice:", error);
    res.status(400).json({ error: "Erro ao adicionar invoice" });
  }
});

app.put("/invoices/:invoiceId", async (req, res) => {
  const { invoiceId } = req.params;

  try {
    const invoice = await prisma.invoice.update({
      where: { id: String(invoiceId) },
      data: req.body,
    });

    res.json(invoice);
  } catch (error) {
    console.error("❌ Error updating invoice:", error);
    res.status(400).json({ error: "Erro ao atualizar invoice" });
  }
});


app.delete("/invoices/:invoiceId", async (req, res) => {
  const { invoiceId } = req.params;
  try {
    await prisma.invoice.delete({
      where: { id: String(invoiceId) }, // Alterando para 'id'
    });
    res.status(204).send();
  } catch (error) {
    console.error("❌ Error deleting invoice:", error);
    res.status(400).json({ error: "Erro ao deletar invoice" });
  }
});



const PORT = process.env.PORT || 5001;
app.listen(PORT, "0.0.0.0", () => {
});
