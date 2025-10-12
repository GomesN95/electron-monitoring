import { useMemo } from "react";

import { BaseChart } from "./BaseChart";

export type Chartprops = {
  data: number[];
  maxDataPoints: number;
};

export function Chart(props: Chartprops) {
  const preparedData = useMemo(() => {
    const points = props.data.map((point) => ({ value: point * 100 }));
    return [
      ...points,
      ...Array.from({ length: props.maxDataPoints - points.length }).map(
        () => ({ value: undefined })
      ),
    ];
  }, [props.data, props.maxDataPoints]);

  return <BaseChart data={preparedData} />;
}
