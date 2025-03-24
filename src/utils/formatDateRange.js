import { format } from "date-fns";

export const formatDateRange = (start, end) => ({
  startDate: format(new Date(start), "MMM d, yyyy"),
  startTime: format(new Date(start), "h:mm a"),
  endTime: format(new Date(end), "h:mm a"),
});
