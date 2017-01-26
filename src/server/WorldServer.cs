using System;
using System.Collections.Generic;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.ServiceModel.Description;

public class WorldServer : IWorldServer
{
	public const uint MAP_WIDTH = 512;
	public const uint MAP_HEIGHT = 512;
	private List <WorldObserver> observers;
	private WorldMap map;

	public WorldServer ()
	{
		this.map = new WorldMap (MAP_WIDTH, MAP_HEIGHT);
		this.observers = new List <WorldObserver> ();
	}

	public static void Main ()
	{
		WorldServer server = new WorldServer ();
		server.Start (8000);
	}

	public void Start (uint port)
	{
		WebServiceHost host = new WebServiceHost(typeof(WorldServer), new Uri("http://localhost:" + port + "/"));
		try
		{
			host.AddServiceEndpoint(typeof(IWorldServer), new WebHttpBinding(), "");
			host.Open();

			Console.WriteLine("Press <ENTER> to terminate");
			Console.ReadLine();

			host.Close();
		}
		catch (CommunicationException cex)
		{
			Console.WriteLine("An exception occurred: {0}", cex.Message);
			host.Abort();
		}
	}

	public byte GetSurface (uint x, uint y) {
		return this.map.GetSurfaceAt (x, y);
	}

	public SurfaceRect GetSurfaceRect (uint left, uint top, uint right, uint bottom) {
		return this.map.GetSurfaceRect (left, top, right, bottom);
	}

	public bool SetSurface (uint x, uint y, byte surface) {
		return this.map.SetSurfaceAt (x, y, surface);
	}

	public bool SetSurfaceRect (uint left, uint top, uint right, uint bottom, byte surface) {
		return this.map.SetSurfaceRect (left, top, right, bottom, surface);
	}

	public bool SetSurfaceCircle (uint x, uint y, uint radius, byte surface) {
		return this.map.SetSurfaceCircle (x, y, radius, surface);
	}

	public bool AttachObserver (WorldObserver observer)
	{
		this.observers.Add (observer);
		return true;
	}
}
