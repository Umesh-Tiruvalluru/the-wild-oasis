import { useSearchParams } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

interface OptionProps {
  label: string;
  value: string;
}

interface FilterProps {
  field: string;
  options: OptionProps[];
}

const Filter = ({ field, options }: FilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = searchParams.get(field) || options[0].value;

  function handleClick(value: string) {
    searchParams.set(field, value);

    if (searchParams.get("page")) searchParams.set("page", "1");
    setSearchParams(searchParams);
  }

  return (
    <Tabs value={value}>
      <TabsList>
        {options.map((option: OptionProps) => (
          <TabsTrigger
            key={option.value}
            onClick={() => handleClick(option.value)}
            value={option.value}
          >
            {option.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default Filter;
