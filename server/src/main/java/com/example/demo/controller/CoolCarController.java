package com.example.demo.controller;

import java.util.Collection;
import java.util.stream.Collectors;

import com.example.demo.model.Car;
import com.example.demo.repository.CarRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class CoolCarController {
    private CarRepository repository;

    @Autowired
    public CoolCarController(CarRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/cool-cars")
    @CrossOrigin(origins = "http://localhost:4200")
    public Collection<Car> coolCars() {
        return repository.findAll().stream()
                .filter(this::isCool)
                .collect(Collectors.toList());
    }

    @GetMapping("/cars")
    @CrossOrigin(origins = "http://localhost:4200")
    public Collection<Car> allCars() {
        return repository.findAll();
    }

    @PostMapping("/add-car")
    @CrossOrigin(origins = "hhtp://localhost:4200")
    public Car newCar(@RequestBody Car car){
        return repository.save(car);
    }

    @PutMapping("/edit-car/{id}")
    @CrossOrigin(origins = "hhtp://localhost:4200")
    public Car editCar( @PathVariable Long id, @RequestBody Car newCar){
        return repository.findById(id).map(car ->{
            car.setName(newCar.getName());
            return repository.save(car);
        }).orElseThrow(() ->
            new ResourceNotFoundException("Car not found for this id " + id)    
        );
    }

    @DeleteMapping("/delete-car/{id}")
    @CrossOrigin(origins = "hhtp://localhost:4200")
    public void deleteCar(@PathVariable Long id){
        repository.deleteById(id);
    }

    private boolean isCool(Car car){
        return !car.getName().equals("AMC Gremlim") &&
                !car.getName().equals("Triumph Stag") &&
                !car.getName().equals("Ford Pinto") &&
                !car.getName().equals("Yugo GV"); 
    }

}