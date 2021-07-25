import React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

function NumberFormatCustom(props) {
  const {
    inputRef,
    onChange,
    thousandSeparator,
    decimalSeparator,
    decimalScale,
    isNumericString,
    allowEmptyFormatting,
    fixedDecimalScale,
    format,
    mask,
    prefix,
    ...other
  } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator={thousandSeparator}
      decimalSeparator={decimalSeparator}
      decimalScale={decimalScale}
      isNumericString={isNumericString}
      allowEmptyFormatting={allowEmptyFormatting}
      fixedDecimalScale={fixedDecimalScale}
      format={format}
      mask={mask}
      prefix={prefix}
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default NumberFormatCustom;
