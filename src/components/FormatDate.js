// @flow
import React from "react";
import format from "date-fns/format";

import compareDate from "../logic/compareDate";

interface Props {
  date: Date;
  format?: string;
}

function FormatDate({ date, format: formatProp = "MMMM d, YYYY" }: Props) {
  return format(date, formatProp);
}

function areEqual(prevProps: Props, nextProps: Props): boolean {
  return compareDate(prevProps.date, nextProps.date);
}

// $FlowFixMe
export default React.memo<Props>(FormatDate, areEqual);
