import { useState } from "react";
import styles from "../styles/Home.module.css";

var MS_IN_MINUTES = 60 * 1000;

function formatTime(date) {
  return date.toISOString().replace(/-|:|\.\d+/g, "");
}

function calculateEndTime(event) {
  return event.end
    ? formatTime(event.end)
    : formatTime(
        new Date(event.start.getTime() + event.duration * MS_IN_MINUTES)
      );
}

function Calendar({ event, ...props }) {
  const { title, description, start, address } = event;
  let startTime = formatTime(start);
  let endTime = calculateEndTime(event);

  let href = encodeURI(
    [
      "https://www.google.com/calendar/render",
      "?action=TEMPLATE",
      "&text=" + (title || ""),
      "&dates=" + (startTime || ""),
      "/" + endTime,
      "&details=" + (description || ""),
      "&location=" + (address || ""),
      "&sprop=&sprop=name",
    ].join("")
  );

  return <a href={href} {...props} />;
}

export default function Wrapper(props) {
  return (
    <div className={styles.container}>
      {navigator?.vendor?.toLowerCase()?.includes("google") && (
        <Calendar {...props}>Google Calendar</Calendar>
      )}
    </div>
  );
}
