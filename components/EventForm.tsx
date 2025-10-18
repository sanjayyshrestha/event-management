'use client'
import { useState, useEffect } from "react";
import { Calendar, MapPin, Users, FileText, Tag, Loader } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import type { Events } from "@/app/page";
import { createEvent, updateEvent } from "@/actions/event";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type Event=Events[number]
export function EventFormPage({event}:{
  event:Event | null
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    capacity: 50,
    category: "conference",
    location: "",
  });

 useEffect(() => {
  if (event) {
    setFormData({
      title: event.title,
      description: event.description || "",
      date: event.date.toISOString().split("T")[0], // "YYYY-MM-DD" for input type="date"
      time: event.time
        ? `${String(event.time.getHours()).padStart(2, "0")}:${String(event.time.getMinutes()).padStart(2, "0")}`
        : "",
      capacity: event.capacity,
      category: event.category?.name || "conference", // use category name if available
      location: event.location || "",
    });
  }
}, [event]);

  const [isEventCreating,setIsEventCreating]=useState(false)
  const [isEventUpdating,setIsEventUpdating]=useState(false)


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
       const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      fd.append(key, value.toString())
    );
    if(!event){
      setIsEventCreating(true)
     
    await createEvent(fd);
    toast.success("Event created successfully")
    }else{
      setIsEventUpdating(true)
      await updateEvent(fd,event.id)
       toast.success("Event updated successfully")
    }
    } catch (error) {
      console.log('Error creating event : ',error)
    }finally{
      setIsEventUpdating(false)
      setIsEventCreating(false)
      redirect('/')
    }
    
  };

  const handleChange = (field: keyof Event, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1>{event ? "Edit Event" : "Create New Event"}</h1>
          <p className="text-muted-foreground">
            {event ? "Update event details below" : "Fill in the details to create a new event"}
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
            <CardDescription>
              Provide information about your event
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Event Title
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="e.g., Tech Conference 2025"
                  required
                  className="bg-input-background"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Describe your event..."
                  rows={4}
                  required
                  className="bg-input-background resize-none"
                />
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    required
                    className="bg-input-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleChange("time", e.target.value)}
                    required
                    className="bg-input-background"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  placeholder="e.g., Convention Center, New York"
                  required
                  className="bg-input-background"
                />
              </div>

              {/* Category and Capacity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category" className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Category
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleChange("category", value)}
                  >
                    <SelectTrigger className="bg-input-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conference">Conference</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="seminar">Seminar</SelectItem>
                      <SelectItem value="networking">Networking</SelectItem>
                      <SelectItem value="webinar">Webinar</SelectItem>
                      <SelectItem value="meetup">Meetup</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Capacity
                  </Label>
                  <Input
                    id="capacity"
                    type="number"
                    min="1"
                    value={formData.capacity}
                    onChange={(e) => handleChange("capacity", parseInt(e.target.value))}
                    required
                    className="bg-input-background"
                  />
                </div>
              </div>

              {/* Preview Card */}
              <div className="pt-4 border-t">
                <Label className="mb-3 block">Preview</Label>
                <Card className="bg-muted/30">
                  <CardHeader>
                    <CardTitle className="line-clamp-1">
                      {formData.title || "Event Title"}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {formData.description || "Event description"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formData.date
                          ? new Date(formData.date).toLocaleDateString()
                          : "Date"}{" "}
                        • {formData.time || "Time"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{formData.location || "Location"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{formData.capacity} seats</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 shadow-md hover:shadow-lg transition-shadow"
                >
{isEventCreating || isEventUpdating ? (
    <Loader className="animate-spin h-5 w-5" />
  ) : (
    event ? "Update Event" : "Create Event"
  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
