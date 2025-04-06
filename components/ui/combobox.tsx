"use client";

import * as React from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, Plus } from "lucide-react";

interface ComboboxProps {
  options: string[];
  value: string;
  onValueChange: (value: string) => void;
  onCustomValue: (value: string) => void;
  placeholder?: string;
}

export function Combobox({
  options,
  value,
  onValueChange,
  onCustomValue,
  placeholder = "Select option"
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleSelect = (currentValue: string) => {
    onValueChange(currentValue);
    setOpen(false);
  };

  const handleCustomAdd = () => {
    if (inputValue.trim()) {
      onCustomValue(inputValue.trim());
      setInputValue("");
      setOpen(false);
    }
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "w-full justify-between border border-input bg-background px-3 py-2 text-sm shadow-sm rounded-md",
            "text-left"
          )}
        >
          {value || placeholder}
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[300px]">
        <Command>
          <CommandInput
            value={inputValue}
            onValueChange={setInputValue}
            placeholder="Search or create..."
          />
          <CommandEmpty>No match found.</CommandEmpty>
          <CommandGroup>
            {filteredOptions.map((option) => (
              <CommandItem
                key={option}
                onSelect={() => handleSelect(option)}
                className="cursor-pointer"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option ? "opacity-100" : "opacity-0"
                  )}
                />
                {option}
              </CommandItem>
            ))}
            {inputValue && !options.includes(inputValue) && (
              <CommandItem
                onSelect={handleCustomAdd}
                className="text-blue-500 cursor-pointer"
              >
                <Plus className="mr-2 h-4 w-4" /> Create “{inputValue}”
              </CommandItem>
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
