import PropTypes from "prop-types";
import { addMinutes, getHours, getMinutes } from "date-fns";
import styles from "./Item.module.scss";

function toHoursAndMinutes(totalMinutes) {
  const minutes = (totalMinutes % 60).toString().padStart(2, '0');
  const hours = Math.floor(totalMinutes / 60).toString().padStart(2, '0');
  const result = `${hours}ч ${minutes}м`;
  return result;
}

function getTimeInterval(startDate, duration) {
  const startTime = new Date(startDate);
  const endTime = addMinutes(startTime, duration);
  const startHours = getHours(startTime).toString().padStart(2, '0');
  const startMinutes = getMinutes(startTime).toString().padStart(2, '0');
  const endHours = getHours(endTime).toString().padStart(2, '0');
  const endMinutes = getMinutes(endTime).toString().padStart(2, '0');

  return `${startHours}:${startMinutes} - ${endHours}:${endMinutes}`;
}

function formatStopsTitle(numOfStops) {
  if (numOfStops === 0) {
    return '0 ПЕРЕСАДОК';
  }
  if (numOfStops === 1) {
    return '1 ПЕРЕСАДКА';
  }
  return `${numOfStops} ПЕРЕСАДКИ`;
}

function Item(props) {
  const { price, carrier, segments } = props;
  const formattedPrice = price.toLocaleString().replace(',', ' ');
  const logo = `//pics.avs.io/99/36/${carrier}.png`;
  const durationTo = toHoursAndMinutes(segments[0].duration);
  const durationFrom = toHoursAndMinutes(segments[1].duration);
  const timeIntervalTo = getTimeInterval(segments[0].date, segments[0].duration);
  const timeIntervalFrom = getTimeInterval(segments[1].date, segments[1].duration);
  const stopsTo = formatStopsTitle(segments[0].stops.length);
  const stopsFrom = formatStopsTitle(segments[1].stops.length);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.price}>{formattedPrice} Р</span>
        <img src={logo} alt="Airline logo" />
      </div>
      <div className={styles.flightInfo}>
        <div className={styles.column}>
          <span className={styles.title}>{segments[0].origin} - {segments[0].destination}</span>
          <span>{timeIntervalTo}</span>
        </div>
        <div className={styles.column}>
          <span className={styles.title}>В ПУТИ</span>
          <span>{durationTo}</span>
        </div>
        <div className={styles.column}>
          <span className={styles.title}>{stopsTo}</span>
          <span>{segments[0].stops.join(", ")}</span>
        </div>
      </div>
      <div className={styles.flightInfo}>
        <div className={styles.column}>
          <span className={styles.title}>{segments[1].origin} - {segments[1].destination}</span>
          <span>{timeIntervalFrom}</span>
        </div>
        <div className={styles.column}>
          <span className={styles.title}>В ПУТИ</span>
          <span>{durationFrom}</span>
        </div>
        <div className={styles.column}>
          <span className={styles.title}>{stopsFrom}</span>
          <span>{segments[1].stops.join(", ")}</span>
        </div>
      </div>
    </div>
  );
}

Item.propTypes = {
  price: PropTypes.number.isRequired,
  carrier: PropTypes.string.isRequired,
  segments: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Item;
