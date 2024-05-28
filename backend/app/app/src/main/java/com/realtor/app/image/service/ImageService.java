package com.realtor.app.image.service;

import com.realtor.app.image.model.Image;

import java.util.List;

public interface ImageService {
    public Image saveImage(Image city);
    public List<Image> getAllImages();
}
