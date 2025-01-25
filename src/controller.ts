import type { RequestHandler } from "express";
import type { AvailableSlot, CalendarQueryRequest } from "./types.ts";
import { findAvailableSlots } from "./db-queries.ts";

export const calendarQueryController: RequestHandler<unknown, AvailableSlot[], CalendarQueryRequest>  = async (req, res) => {
    res.json(await findAvailableSlots(req.body));
}
