import React from 'react';
import { Chart } from 'frappe-charts/dist/frappe-charts.min.esm';
import 'frappe-charts/dist/frappe-charts.min.css';
export default function FrappeChart({ onSelect, ...props }) {
  const ref = React.useRef(null);
  const chart = React.useRef(null);
  console.log('object');
  React.useEffect(() => {
    chart.current = new Chart(ref.current, {
      isNavigable: !!onSelect,
      ...props,
    });
    if (onSelect) {
      chart.current.parent.addEventListener('data-select', (e) => {
        e.preventDefault();
        onSelect(e);
      });
    }
  }, []);

  // React.useEffect(() => {
  //   chart.current.update(props.data);
  // }, [props.data]);

  return <div ref={ref} />;
}
