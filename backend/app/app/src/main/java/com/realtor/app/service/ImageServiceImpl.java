package com.realtor.app.service;

import com.realtor.app.model.Image;
import com.realtor.app.repo.ImageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageServiceImpl implements ImageService {
    @Autowired
    private ImageRepo imageRepo;
    @Override
    public Image saveImage(Image image){
        return imageRepo.save(image);
    }

    @Override
    public List<Image> getAllImages() {
        return imageRepo.findAll();
    }
}
