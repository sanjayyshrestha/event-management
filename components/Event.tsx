import React from "react";
import { Calendar, Filter, Grid3x3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Events } from "@/app/page";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import EventCard from "./EventCard";

export default function DiscoverEvents({
  events,
  user,
}: {
  events: Events;
  user: {
    id: string;
    name: string;
    role: string;
  };
}) {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
              Discover Events
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Find and book amazing events near you
            </p>
          </div>
          <div className="flex gap-2 self-end sm:self-auto">
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Grid3x3 className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <List className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6 sm:mb-8 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search events..."
                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            {/* Filter Select */}
            <div className="w-full sm:w-48">
              <Select defaultValue="all">
                <SelectTrigger className="h-12 bg-gray-50 border-gray-200">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2 text-gray-600" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="conference">Conference</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="seminar">Seminar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Select */}
            <div className="w-full sm:w-52">
              <Select defaultValue="all-dates">
                <SelectTrigger className="h-12 bg-gray-50 border-gray-200">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-600" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-dates">All Dates</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Events Grid */}

        <EventCard events={events} user={user} />
      </div>
    </div>
  );
}
