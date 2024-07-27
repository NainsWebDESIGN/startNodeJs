import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-three-js',
  templateUrl: './three-js.component.html',
  styleUrls: ['./three-js.component.scss']
})
export class ThreeJsComponent implements OnInit, AfterViewInit {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.initThreeJs();
  }

  ngAfterViewInit() {
    this.el.nativeElement.appendChild(this.renderer.domElement);
  }

  private initThreeJs() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(350, 200);

    const geometry = new THREE.BoxGeometry(3, 3, 3);
    const textureloader = new THREE.TextureLoader();
    const texture = textureloader.load("./images/bg.png");
    // 添加顏色
    // const material = new THREE.MeshBasicMaterial({ color: 0x5C1896 });
    // 添加材質
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);

    this.camera.position.z = 5;

    this.animate(cube);
  }

  private animate(cube: THREE.Mesh) {
    requestAnimationFrame(() => this.animate(cube));

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  }
}
