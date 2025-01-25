import { dbClient } from "./db-connection.ts";
import type { AvailableSlot, CalendarQueryRequest } from "./types.ts";

export const findAvailableSlots = async ({date, language, rating, products}: CalendarQueryRequest): Promise<AvailableSlot[]> => {
  const query = await dbClient.query({
    text: `SELECT s.start_date, COUNT(1)::int as available_count 
            FROM slots as s
            INNER JOIN sales_managers as m on s.sales_manager_id = m.id
            WHERE start_date::date = $1
            AND booked = false
            AND m.languages @> ARRAY[$2::varchar]
            AND m.customer_ratings @> ARRAY[$3::varchar]
            AND m.products @> $4::varchar[]
            AND NOT EXISTS (
                -- Check that the sales manager is not already booked for the given time
                SELECT 1
                FROM slots as booked
                WHERE booked.sales_manager_id = s.sales_manager_id
                AND booked = true
                AND (booked.start_date >= s.start_date and booked.start_date < s.end_date OR booked.end_date > s.start_date and booked.end_date <= s.end_date)
            )
            group by 1`,
    values: [date, language, rating, products],
  });
  return query.rows;
}
