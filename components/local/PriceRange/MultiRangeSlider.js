import React, { useCallback, useEffect, useState, useRef } from "react";
// import PropTypes from "prop-types";
import "./MultiRangeSlider.css";
import { Button } from "@/components/ui/button";

const MultiRangeSlider = ({ min, max, onFilter }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Adjust the slider range dynamically
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  const handleFilter = () => {
    onFilter({ min: minVal, max: maxVal });
  };

  return (
    <div className="multi-range-slider">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 100 && "5" }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className="thumb thumb--right"
      />
      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
      </div>

      <div className="space-y-2 mt-5">
        <p className="text-sm text-[#7e7e7e]">
          Price:{" "}
          <span className="text-[#151515] font-semibold">
            {new Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
            }).format(minVal)}{" "}
            --{" "}
            {new Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: "NGN",
            }).format(maxVal)}
          </span>
        </p>
        <div className="w-full flex justify-end">
          <Button onClick={handleFilter} variant="secondary">
            FILTER
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
