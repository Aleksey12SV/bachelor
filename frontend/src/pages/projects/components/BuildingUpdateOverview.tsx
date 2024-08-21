import { getCities } from "@/api/cities";
import { getDistrictsByCityId } from "@/api/districts";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Building } from "@/models/Building";
import { City } from "@/models/City";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

const BuildingUpdateOverview = ({
  building,
}: {
  building: Building | undefined;
}) => {
  const [selectedCity, setSelectedCity] = useState<City>();
  const { data: cities } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
    initialData: [],
  });
  const { data: districts } = useQuery({
    queryKey: ["districts"],
    queryFn: async () => await getDistrictsByCityId(selectedCity?.id ?? -1),
    enabled: selectedCity?.id !== undefined,
    initialData: [],
  });

  const form = useForm<Partial<Building>>({
    defaultValues: {
      name: "",
    },
    values: {
      name: building?.name,
      district: building?.district,
      floors: building?.floors,
      year: building?.year,
      description: building?.description,
      construction: building?.construction,
    },
  });
  const handleSubmit = (data: Partial<Building>) => {
    console.log(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid grid-cols-2 gap-6"
      >
        <Button type="submit">Submit</Button>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="floors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Floors</FormLabel>
              <FormControl>
                <Input min={0} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <FormControl>
                <Input type="number" min={0} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="construction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Construction</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Panel">Panel</SelectItem>
                  <SelectItem value="Brick">Brick</SelectItem>
                  <SelectItem value="Temporary construction">
                    Temporary construction
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Building Description" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div>
          <FormItem>
            <FormLabel>City</FormLabel>
            <Select
              onValueChange={(value) =>
                setSelectedCity(cities.find((c) => c.name === value))
              }
            >
              <FormControl>
                <SelectTrigger>
                  <div>{selectedCity?.name ?? ""}</div>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {cities?.map((city) => (
                  <SelectItem key={city.id} value={city.name}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        </div>
        {selectedCity && (
          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel>District</FormLabel>
                <Select
                  onValueChange={(value) =>
                    field.onChange(
                      districts?.find((d) => d.id.toString() === value)
                    )
                  }
                >
                  <FormControl>
                    <SelectTrigger>
                      <div>
                        {field.value
                          ? field.value?.name + ", " + field.value.city.name
                          : ""}
                      </div>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {(districts ?? [])?.map((d) => (
                      <SelectItem key={d.id} value={d.id.toString()}>
                        {d.name}, {d.city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        )}
      </form>
    </Form>
  );
};

export default BuildingUpdateOverview;
