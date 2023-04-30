import React from "react";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Box,
} from "@chakra-ui/react";
import { CiLocationOn } from "react-icons/ci";
import { useState } from "react";

const CustomSlider = ({
  sliderValue,
  setSliderValue,
}: {
  sliderValue: any;
  setSliderValue: any;
}) => {
  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };

  return (
    <Box pt={6} pb={2}>
      <Slider
        aria-label="slider-ex-6"
        min={1}
        max={300}
        step={10}
        width={400}
        colorScheme="purple"
        onChange={(val) => setSliderValue(val)}
      >
        <SliderMark value={75} {...labelStyles}>
          75km
        </SliderMark>
        <SliderMark value={150} {...labelStyles}>
          150km
        </SliderMark>
        <SliderMark value={225} {...labelStyles}>
          225km
        </SliderMark>

        <SliderMark
          value={sliderValue}
          textAlign="center"
          bg="purple.500"
          color="white"
          mt="-10"
          ml="-5"
          w="12"
        >
          {sliderValue}km
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb boxSize={6}>
          <Box color="purple" as={CiLocationOn} />
        </SliderThumb>
      </Slider>
    </Box>
  );
};

export default CustomSlider;
