-- CreateTable
CREATE TABLE "User" (
    "ci" TEXT NOT NULL PRIMARY KEY,
    "matricula" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "encuesta_completada" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL
);
