import { useState } from "react";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";

const Calendar = dynamic(() => import("../components/googlecal"), {
  ssr: false,
});

export default function GoogleCal() {
  const [event, setEvent] = useState({
    title: "Walking down the street",
    start: new Date(),
    duration: 120,
    address: "Abbey Road",
    description: "This event is gonna be so cool",
  });

  const handleChange = (e) =>
    setEvent({ ...event, [e.target.name]: e.target.value });

  return (
    <div className={styles.container}>
      <input value={event.title} name="title" onChange={handleChange} />

      <div>
        <input
          value={event.duration}
          name="duration"
          type="range"
          onChange={handleChange}
        />
        {event.duration} min
      </div>
      <Calendar target="_blank" event={event}>
        Google Calendar
      </Calendar>
    </div>
  );
}
