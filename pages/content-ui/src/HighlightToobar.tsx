import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/popover";

export default function HighlightToobar() {
  return (<Popover>
    <PopoverTrigger>Open</PopoverTrigger>
    <PopoverContent>Place content for the popover here.</PopoverContent>
  </Popover>)

}

