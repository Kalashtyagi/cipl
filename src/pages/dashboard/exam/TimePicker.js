import React from 'react'

const TimePicker = () => {
  return (
    <div>
          <div
              class="relative mb-3 xl:w-96"
              data-te-with-icon="false"
              data-te-timepicker-init
              data-te-input-wrapper-init
              id="timepicker-just-input">
              <input
                  type="text"
                  class="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  data-te-toggle="timepicker-just-input"
                  id="form15" />
              <label
                  for="form15"
                  class="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
              >Select a time</label>
          </div>
    </div>
  )
}

export default TimePicker




