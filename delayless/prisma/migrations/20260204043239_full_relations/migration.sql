-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Station"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Station"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
