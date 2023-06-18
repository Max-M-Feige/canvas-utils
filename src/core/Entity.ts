//Disable these warnings for this file since update and draw are meant to be overriden
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Transform2D } from "../math/transform2d";

export class Entity
{
	public transform: Transform2D;
	public z_index: number;
	public parent: Entity | null;
	constructor()
	{
		this.transform = Transform2D.Identity;
		this.z_index = 0;
		this.parent = null;
	}

	public update(dt: number): void
	{

	}
	public draw(dt: number): void
	{

	}
	public getFullTransform(): Transform2D
	{
		if (this.parent === null)
		{
			return this.transform;
		}
		return this.parent.getFullTransform().apply(this.transform);
	}

}