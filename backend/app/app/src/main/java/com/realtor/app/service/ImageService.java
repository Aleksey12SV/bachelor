package com.realtor.app.service;

import com.realtor.app.model.Image;

import java.util.List;

public interface ImageService {
    public Image saveImage(Image city);
    public List<Image> getAllImages();
}
