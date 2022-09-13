package com.techelevator.controller;

import com.techelevator.model.event.Event;
import com.techelevator.model.restaurant.Restaurant;
import com.techelevator.service.EventService;
import com.techelevator.service.RestaurantService;
import com.techelevator.service.YelpBusinessService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/event")
//@PreAuthorize("isAuthenticated()")
public class EventController {

    private final EventService service;
    private final RestaurantService restaurantService;
    private final YelpBusinessService yelpBusinessService;

    public EventController(EventService service, RestaurantService restaurantService, YelpBusinessService yelpBusinessService) {
        this.service = service;
        this.restaurantService = restaurantService;
        this.yelpBusinessService = yelpBusinessService;
    }

    @GetMapping("/{id}")
    public Event getEvent(@PathVariable long id) {
        return service.getEvent(id);
    }

    @GetMapping("/host/{id}")
    public List<Event> getEventsByHost(@PathVariable long id) {
        return service.getEventsByHost(id);
    }

    @PostMapping
    public boolean addEvent(@RequestBody Event newEvent) {
        for (Restaurant restaurant: newEvent.getEventRestaurants()) {
            restaurantService.addRestaurant(yelpBusinessService.getBusinessById(restaurant.getId()));
        }
        return service.addEvent(newEvent);
    }

}
